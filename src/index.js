import { createInterface } from "readline/promises"
import {
  addPlant,
  getPlantInfo,
  waterPlant,
  getCareTips,
  listPlants,
  deletePlant,
  updatePlant,
  checkWateringNeeds,
  savePlantsToJSON,
  loadPlantsFromJSON,
} from "./plantManager.js"

const DATA_FILE = "./plant-data.json"

const displayMenu = () => {
  console.log("\n===== Virtual Plant Care Assistant =====")
  console.log("1. Add Plant")
  console.log("2. Get Plant Info")
  console.log("3. Water Plant")
  console.log("4. Get Care Tips")
  console.log("5. List Plants")
  console.log("6. Delete Plant")
  console.log("7. Update Plant")
  console.log("8. Check Watering Needs")
  console.log("9. Save Plants Data")
  console.log("10. Load Plants Data")
  console.log("11. Exit")
  console.log("========================================")
}

const main = async () => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    // Try to load existing data
    loadPlantsFromJSON(DATA_FILE)
  } catch (error) {
    console.log("No existing data found or error loading data.")
  }

  const promptUser = async () => {
    try {
      displayMenu()
      const option = await readline.question("Choose an option: ")

      switch (option) {
        case "1": // Add Plant
          try {
            const name = await readline.question("Enter plant name: ")
            const type = await readline.question("Enter plant type: ")
            const frequency = await readline.question("Enter watering frequency (days): ")
            const tips = await readline.question("Enter care tips: ")

            const result = addPlant(name, type, frequency, tips)
            console.log(`Plant ${name} added successfully!`)
            console.log(result)
          } catch (error) {
            console.error(`Error: ${error.message}`)
          }
          break

        case "2": // Get Plant Info
          try {
            const name = await readline.question("Enter plant name: ")
            const info = getPlantInfo(name)
            console.log("Plant Information:")
            console.log(info)
          } catch (error) {
            console.error(`Error: ${error.message}`)
          }
          break

        case "3": // Water Plant
          try {
            const name = await readline.question("Enter plant name: ")
            const result = waterPlant(name)
            console.log(result.message)
          } catch (error) {
            console.error(`Error: ${error.message}`)
          }
          break

        case "4": // Get Care Tips
          try {
            const name = await readline.question("Enter plant name: ")
            const tips = getCareTips(name)
            console.log(`Care tips for ${tips.name}: ${tips.careTips}`)
          } catch (error) {
            console.error(`Error: ${error.message}`)
          }
          break

        case "5": // List Plants
          try {
            const plants = listPlants()
            if (plants.length === 0) {
              console.log("No plants added yet.")
            } else {
              console.log("Your Plants:")
              plants.forEach((plant) => {
                const lastWatered = plant.lastWatered ? new Date(plant.lastWatered).toLocaleDateString() : "Never"
                console.log(`- ${plant.name} (${plant.type}): Last watered: ${lastWatered}`)
              })
            }
          } catch (error) {
            console.error(`Error: ${error.message}`)
          }
          break

        case "6": // Delete Plant
          try {
            const name = await readline.question("Enter plant name to delete: ")
            const result = deletePlant(name)
            console.log(result.message)
          } catch (error) {
            console.error(`Error: ${error.message}`)
          }
          break

        case "7": // Update Plant
          try {
            const name = await readline.question("Enter plant name to update: ")
            console.log("Enter new values (leave empty to keep current value):")

            const type = await readline.question("Enter new plant type: ")
            const frequency = await readline.question("Enter new watering frequency (days): ")
            const tips = await readline.question("Enter new care tips: ")

            const updates = {}
            if (type) updates.type = type
            if (frequency) updates.wateringFrequency = frequency
            if (tips) updates.careTips = tips

            if (Object.keys(updates).length === 0) {
              console.log("No updates provided.")
            } else {
              const result = updatePlant(name, updates)
              console.log(`Plant ${name} updated successfully!`)
              console.log(result)
            }
          } catch (error) {
            console.error(`Error: ${error.message}`)
          }
          break

        case "8": // Check Watering Needs
          try {
            const needsWatering = checkWateringNeeds()
            if (needsWatering.length === 0) {
              console.log("All plants are properly watered!")
            } else {
              console.log("Plants that need watering:")
              needsWatering.forEach((plant) => {
                console.log(`- ${plant.name}: ${plant.message}`)
              })
            }
          } catch (error) {
            console.error(`Error: ${error.message}`)
          }
          break

        case "9": // Save Plants Data
          try {
            const result = savePlantsToJSON(DATA_FILE)
            console.log(result.message)
          } catch (error) {
            console.error(`Error saving data: ${error.message}`)
          }
          break

        case "10": // Load Plants Data
          try {
            const result = loadPlantsFromJSON(DATA_FILE)
            console.log(result.message)
          } catch (error) {
            console.error(`Error loading data: ${error.message}`)
          }
          break

        case "11": // Exit
          // Save data before exiting
          try {
            savePlantsToJSON(DATA_FILE)
            console.log("Data saved. Goodbye!")
          } catch (error) {
            console.log("Error saving data before exit.")
          }
          readline.close()
          return

        default:
          console.log("Invalid option, please try again.")
          break
      }

      await promptUser()
    } catch (error) {
      console.error(`An unexpected error occurred: ${error.message}`)
      await promptUser()
    }
  }

  await promptUser()
}

// If this file is run directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`Fatal error: ${error.message}`)
    process.exit(1)
  })
}


export {
  addPlant,
  getPlantInfo,
  waterPlant,
  getCareTips,
  listPlants,
  deletePlant,
  updatePlant,
  checkWateringNeeds,
  savePlantsToJSON,
  loadPlantsFromJSON,
}

