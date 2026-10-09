const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const DATA_FILE = path.join(__dirname, '../lib/opportunities.json');

// Mock function representing an API call to an official provider (e.g., Unstop, Devpost, MLH)
// In a real scenario, this would use process.env.UNSTOP_API_KEY or process.env.DEVPOST_API_KEY
async function fetchFromOfficialAPI() {
  console.log('Fetching from official APIs (mocked)...');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: "9",
      title: "Winter of Code 2026",
      organizer: "Devpost",
      event_type: "hackathon",
      description: "A month-long open source coding competition.",
      location: "Online",
      mode: "online",
      skills: ["Open Source", "Git", "JavaScript", "Python"],
      is_active: true,
      registration_deadline: "2026-11-30T23:59:59Z",
      url: "https://devpost.com/",
      created_at: new Date().toISOString()
    },
    {
      id: "10",
      title: "Global AI Bootcamp",
      organizer: "Microsoft Student Ambassadors",
      event_type: "workshop",
      description: "Learn about Azure AI, Copilot, and Machine Learning.",
      location: "Hybrid",
      mode: "hybrid",
      skills: ["Azure", "AI", "Machine Learning"],
      is_active: true,
      registration_deadline: "2026-12-05T23:59:59Z",
      url: "https://devpost.com/",
      created_at: new Date().toISOString()
    }
  ];
}

async function ingest() {
  console.log('Starting data ingestion process...');

  try {
    const newOpportunities = await fetchFromOfficialAPI();
    
    // Attempt database ingestion if DATABASE_URL is provided
    if (process.env.DATABASE_URL) {
      console.log('DATABASE_URL found, attempting database upsert...');
      const client = new Client({ connectionString: process.env.DATABASE_URL });
      await client.connect();
      
      for (const opp of newOpportunities) {
        await client.query(`
          INSERT INTO public.opportunities (
            title, organizer, event_type, location, mode, description, 
            source, source_id, url, registration_deadline, is_active
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (source, source_id) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            registration_deadline = EXCLUDED.registration_deadline,
            is_active = EXCLUDED.is_active
        `, [
          opp.title, opp.organizer, opp.event_type, opp.location, opp.mode, opp.description,
          'api', opp.id, opp.url, opp.registration_deadline, opp.is_active
        ]);
      }
      await client.end();
      console.log('Database ingestion complete.');
    } else {
      console.log('No DATABASE_URL found. Falling back to local JSON data store...');
      
      let existingData = [];
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        existingData = JSON.parse(fileContent);
      }
      
      let newRecordsCount = 0;
      let updatedRecordsCount = 0;

      newOpportunities.forEach(newOpp => {
        const existingIndex = existingData.findIndex(
          opp => opp.id === newOpp.id || (opp.title === newOpp.title && opp.organizer === newOpp.organizer)
        );

        if (existingIndex >= 0) {
          // Update existing
          existingData[existingIndex] = { ...existingData[existingIndex], ...newOpp };
          updatedRecordsCount++;
        } else {
          // Insert new
          existingData.push(newOpp);
          newRecordsCount++;
        }
      });

      fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2), 'utf-8');
      console.log(`Local JSON update complete: Added ${newRecordsCount} new, Updated ${updatedRecordsCount} existing records.`);
    }

  } catch (err) {
    console.error('Data ingestion failed:', err);
  }
}

ingest();
