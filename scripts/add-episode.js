#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function addEpisode() {
    try {
        // Get episode details
        const date = await question('Episode date (YYYY-MM-DD): ');
        const speaker = await question('Speaker name: ');
        const title = await question('Episode title: ');
        const link = await question('Episode link (or press enter for upcoming): ');
        
        console.log('\nAvailable tags: Investing, Macro, Politics, Economics, Mining, Technology, Banking, Analysis, Markets');
        const tagsInput = await question('Tags (comma-separated): ');
        const tags = tagsInput.split(',').map(tag => tag.trim());

        // Create episode object
        const newEpisode = {
            date,
            speaker,
            title,
            tags,
            link: link || '#'
        };

        // Read existing episodes file
        const episodesPath = path.join(__dirname, '..', 'episodes.json');
        let episodes = [];
        
        if (fs.existsSync(episodesPath)) {
            const data = fs.readFileSync(episodesPath, 'utf8');
            episodes = JSON.parse(data);
        }

        // Add new episode
        episodes.push(newEpisode);

        // Sort episodes by date
        episodes.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Write back to file
        fs.writeFileSync(episodesPath, JSON.stringify(episodes, null, 2));

        console.log('\nEpisode added successfully!');
        console.log(newEpisode);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close();
    }
}

addEpisode();
