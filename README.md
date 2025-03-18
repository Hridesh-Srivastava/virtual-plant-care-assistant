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

## API Reference

### Plant Management

#### `addPlant(name, type, wateringFrequency, careTips)`

Adds a new plant to your collection.

- **Parameters**:

- `name` (string): The name of the plant
- `type` (string): The type/category of the plant
- `wateringFrequency` (number): How often to water the plant (in days)
- `careTips` (string): Care instructions for the plant



- **Returns**: Object containing the plant information


#### `getPlantInfo(name)`

Returns detailed information about a specific plant.

- **Parameters**:

- `name` (string): The name of the plant



- **Returns**: Object containing the plant information


#### `waterPlant(name)`

Records that you've watered a plant and updates the last watered date.

- **Parameters**:

- `name` (string): The name of the plant



- **Returns**: Object with a success message and updated plant information


#### `getCareTips(name)`

Returns care tips for a specific plant.

- **Parameters**:

- `name` (string): The name of the plant



- **Returns**: Object with the plant name and care tips


#### `listPlants()`

Returns a list of all plants in your collection.

- **Returns**: Array of plant objects


#### `deletePlant(name)`

Removes a plant from your collection.

- **Parameters**:

- `name` (string): The name of the plant



- **Returns**: Object with a success message and the deleted plant information


#### `updatePlant(name, updates)`

Updates information for an existing plant.

- **Parameters**:

- `name` (string): The name of the plant
- `updates` (object): Object containing the fields to update



- **Returns**: Object with the updated plant information


### Watering Management

#### `checkWateringNeeds()`

Returns a list of plants that need watering based on their watering frequency.

- **Returns**: Array of plants that need watering


### Data Persistence

#### `savePlantsToJSON(filePath)`

Saves your plant data to a JSON file.

- **Parameters**:

- `filePath` (string): Path where the JSON file should be saved



- **Returns**: Object with a success message


#### `loadPlantsFromJSON(filePath)`

Loads plant data from a JSON file.

- **Parameters**:

- `filePath` (string): Path to the JSON file



- **Returns**: Object with a success message and count of loaded plants
