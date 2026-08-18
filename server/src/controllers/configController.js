import { PrismaClient } from '@prisma/client';
import {
  calculateEstimate,
  formatConfigForPublic,
  parseQuestions,
  validateAnswers,
} from '../services/calculator.js';

const prisma = new PrismaClient();

async function getActiveConfig() {
  return prisma.config.findFirst({
    where: { isActive: true },
    orderBy: { configVersion: 'desc' },
  });
}

export async function getPublicConfig(req, res) {
  try {
    const config = await getActiveConfig();
    if (!config) {
      return res.status(404).json({ error: 'No active configuration found' });
    }
    return res.json(formatConfigForPublic(config));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to load configuration' });
  }
}

export async function createEstimate(req, res) {
  try {
    const { name, phone, email, answers } = req.body;

    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return res.status(400).json({ error: 'Name, phone, and email are required.' });
    }

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Answers payload is required.' });
    }

    const config = await getActiveConfig();
    if (!config) {
      return res.status(404).json({ error: 'No active configuration found' });
    }

    const validationErrors = validateAnswers(config, answers);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors.join(' ') });
    }

    const estimate = calculateEstimate(config, answers);

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        answers: JSON.stringify(answers),
        estimateLow: estimate.estimate_low,
        estimateHigh: estimate.estimate_high,
        configVersion: config.configVersion,
        configId: config.id,
        // Status by default schema mein agar add na kiya ho to yahan error na aaye isliye omit kiya.
      },
    });

    return res.status(201).json({
      lead_id: lead.id,
      config_version: config.configVersion,
      business: {
        name: config.businessName,
        currency: config.currency,
      },
      estimate_low: estimate.estimate_low,
      estimate_high: estimate.estimate_high,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create estimate' });
  }
}

export async function updateConfig(req, res) {
  try {
    const currentConfig = await getActiveConfig();
    if (!currentConfig) {
      return res.status(404).json({ error: 'No active configuration found' });
    }

    const {
      business,
      questions,
      modifiers,
    } = req.body;

    const parsedQuestions = questions ?? parseQuestions(currentConfig.questions);

    const updatedConfig = await prisma.config.create({
      data: {
        configVersion: currentConfig.configVersion + 1,
        businessName: business?.name ?? currentConfig.businessName,
        businessRegion: business?.region ?? currentConfig.businessRegion,
        currency: business?.currency ?? currentConfig.currency,
        wasteFactor: modifiers?.waste_factor ?? currentConfig.wasteFactor,
        permitFlatFee: modifiers?.permit_flat_fee ?? currentConfig.permitFlatFee,
        rangeSpreadPct: modifiers?.range_spread_pct ?? currentConfig.rangeSpreadPct,
        isActive: true,
        questions: JSON.stringify(parsedQuestions),
      },
    });

    await prisma.config.update({
      where: { id: currentConfig.id },
      data: { isActive: false },
    });

    return res.json(formatConfigForPublic(updatedConfig));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update configuration' });
  }
}

export async function getLeads(req, res) {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.json(
      leads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        answers: JSON.parse(lead.answers),
        estimate_low: lead.estimateLow,
        estimate_high: lead.estimateHigh,
        config_version: lead.configVersion,
        status: lead.status || 'pending', // 🟢 Frontend ke liye status yahan bhej rahe hain
        created_at: lead.createdAt,
      })),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to load leads' });
  }
}

// 🟢 NEW: Update Lead Status Controller
export async function updateLeadStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await prisma.lead.update({
      where: { id: parseInt(id, 10) }, // ID ko URL se Integer me convert kiya hai
      data: { status },
    });

    return res.json({ success: true, message: 'Lead status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update lead status' });
  }
}

// 🟢 NEW: Delete Lead Controller
export async function deleteLead(req, res) {
  try {
    const { id } = req.params;
    
    await prisma.lead.delete({
      where: { id: parseInt(id, 10) },
    });

    return res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete lead' });
  }
}