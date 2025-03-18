# Virtual Plant Care Assistant 

A Node.js package to help you manage and track your plants' care needs.

[![npm version](https://img.shields.io/npm/v/virtual-plant-care-assistant.svg)](https://www.npmjs.com/package/virtual-plant-care-assistant)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🌿 Add, update, and delete plants in your collection
- 💧 Track watering schedules and get reminders for plants that need watering
- 📝 Store plant-specific care tips
- 💾 Save and load your plant data for persistence
- 🖥️ Command-line interface for easy management
- 📦 Can be used as a module in your own applications

## Installation

### Global Installation (for CLI usage)

```
npm install -g virtual-plant-care-assistant
```

### Local Installation (for use in your project)

```
npm install virtual-plant-care-assistant
```

## Usage

### As a Command-Line Tool

If installed globally, simply run:

```
plant-care
```

This will start an interactive CLI where you can:

- Add new plants
- Get information about your plants
- Water your plants
- Get care tips
- List all your plants
- Delete plants
- Update plant information
- Check which plants need watering
- Save/load your plant data

## As a Module in Your Project
```
import { 
  addPlant, 
  waterPlant, 
  getPlantInfo, 
  listPlants,
  checkWateringNeeds 
} from 'virtual-plant-care-assistant';

// Add a new plant
addPlant('Monstera', 'Tropical', 7, 'Keep soil moist but not soggy');

// Water a plant
waterPlant('Monstera');

// Get information about a plant
const plantInfo = getPlantInfo('Monstera');
console.log(plantInfo);

// List all plants
const allPlants = listPlants();
console.log(allPlants);

// Check which plants need watering
const needsWatering = checkWateringNeeds();
console.log(needsWatering);
```
