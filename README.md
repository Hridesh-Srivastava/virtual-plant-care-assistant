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

## Example for testing (As a Module in Your Project) :
```

import { 
    addPlant, 
    getPlantInfo, 
    waterPlant, 
    getCareTips, 
    listPlants,
    deletePlant,
    updatePlant,
    checkWateringNeeds,
    loadPlantsFromJSON,
    savePlantsToJSON
  } from 'virtual-plant-care-assistant';
  
  const logSection = (title) => {
    console.log(`\n${title}`);
    console.log('='.repeat(title.length));
  };
  
  const runTests = async () => {
    console.log('===== VIRTUAL PLANT CARE ASSISTANT DEMO =====\n');
  
    // 1. Add some plants
    logSection('1. ADDING PLANTS');
    try {
      console.log(addPlant('Monstera', 'Tropical', 7, 'Keep soil moist but not soggy'));
      console.log(addPlant('Snake Plant', 'Succulent', 14, 'Allow soil to dry completely between waterings'));
      console.log(addPlant('Pothos', 'Vine', 10, 'Tolerates low light, water when top inch of soil is dry'));
      console.log('✅ Plants added successfully\n');
    } catch (error) {
      console.error('❌ Error adding plants:', error.message);
    }
  
    // 2. List all plants
    logSection('2. LISTING ALL PLANTS');
    try {
      const plants = listPlants();
      console.log(plants);
      console.log('✅ Plants listed successfully\n');
    } catch (error) {
      console.error('❌ Error listing plants:', error.message);
    }
  
    // 3. Get info for a specific plant
    logSection('3. GETTING PLANT INFO');
    try {
      const monsteraInfo = getPlantInfo('Monstera');
      console.log(monsteraInfo);
      console.log('✅ Plant info retrieved successfully\n');
    } catch (error) {
      console.error('❌ Error getting plant info:', error.message);
    }
  
    // 4. Water a plant
    logSection('4. WATERING A PLANT');
    try {
      const waterResult = waterPlant('Snake Plant');
      console.log(waterResult);
      console.log('✅ Plant watered successfully\n');
    } catch (error) {
      console.error('❌ Error watering plant:', error.message);
    }
  
    // 5. Get care tips
    logSection('5. GETTING CARE TIPS');
    try {
      const careTips = getCareTips('Pothos');
      console.log(careTips);
      console.log('✅ Care tips retrieved successfully\n');
    } catch (error) {
      console.error('❌ Error getting care tips:', error.message);
    }
  
    // 6. Update a plant
    logSection('6. UPDATING A PLANT');
    try {
      const updateResult = updatePlant('Monstera', {
        wateringFrequency: 5,
        careTips: 'Keep in bright indirect light and mist leaves regularly for humidity'
      });
      console.log(updateResult);
      console.log('✅ Plant updated successfully\n');
    } catch (error) {
      console.error('❌ Error updating plant:', error.message);
    }
  
    // 7. Check watering needs
    logSection('7. CHECKING WATERING NEEDS');
    try {
      const needsWatering = checkWateringNeeds();
      console.log(needsWatering);
      console.log('✅ Watering needs checked successfully\n');
    } catch (error) {
      console.error('❌ Error checking watering needs:', error.message);
    }
  
    // 8. Save plants data to file
    logSection('8. SAVING PLANTS DATA');
    try {
      const saveResult = await savePlantsToJSON('./my-plants-data.json');
      console.log(saveResult);
      console.log('✅ Plants data saved successfully\n');
    } catch (error) {
      console.error('❌ Error saving plants data:', error.message);
    }
  
    // 9. Load plants from file
    logSection('9. LOADING PLANTS DATA');
    try {
      const loadResult = await loadPlantsFromJSON('./my-plants-data.json');
      console.log(loadResult);
      console.log('✅ Plants data loaded successfully\n');
    } catch (error) {
      console.error('❌ Error loading plants data:', error.message);
    }
  
    // 10. Delete a plant
    logSection('10. DELETING A PLANT');
    try {
      const deleteResult = deletePlant('Pothos');
      console.log(deleteResult);
      
      // Verify deletion by listing remaining plants
      console.log('Remaining plants:');
      console.log(listPlants());
      console.log('✅ Plant deleted successfully\n');
    } catch (error) {
      console.error('❌ Error deleting plant:', error.message);
    }
  
    console.log('===== DEMO COMPLETED =====');
  };
  
  runTests().catch(error => {
    console.error('Test failed with error:', error);
  });
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.

## Author

Hridesh Srivastava
=======

