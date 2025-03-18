// In-memory storage for plants
let plants = {}

// to add a new plant
export const addPlant = (name, type, wateringFrequency, careTips) => {
  if (!name || typeof name !== "string") {
    throw new Error("Plant name is required and must be a string")
  }

  // Convert wateringFrequency to a number
  const frequency = Number.parseInt(wateringFrequency, 10)
  if (isNaN(frequency) || frequency <= 0) {
    throw new Error("Watering frequency must be a positive number")
  }

  plants[name] = {
    type: type || "Unknown",
    wateringFrequency: frequency,
    careTips: careTips || "",
    lastWatered: null,
    dateAdded: new Date(),
  }

  return { name, ...plants[name] }
}

//to get information about a specific plant
export const getPlantInfo = (name) => {
  if (!name || typeof name !== "string") {
    throw new Error("Plant name is required and must be a string")
  }

  if (!plants[name]) {
    throw new Error(`Plant "${name}" not found!`)
  }

  return { name, ...plants[name] }
}

// to water a plant and update its last watered date
export const waterPlant = (name) => {
  if (!name || typeof name !== "string") {
    throw new Error("Plant name is required and must be a string")
  }

  if (!plants[name]) {
    throw new Error(`Plant "${name}" not found!`)
  }

  plants[name].lastWatered = new Date()
  return {
    message: `${name} has been watered.`,
    plant: { name, ...plants[name] },
  }
}

// to get care tips for a specific plant
export const getCareTips = (name) => {
  if (!name || typeof name !== "string") {
    throw new Error("Plant name is required and must be a string")
  }

  if (!plants[name]) {
    throw new Error(`Plant "${name}" not found!`)
  }

  return {
    name,
    careTips: plants[name].careTips,
  }
}

// to list all plants
export const listPlants = () => {
  return Object.keys(plants).map((name) => ({
    name,
    type: plants[name].type,
    lastWatered: plants[name].lastWatered,
    wateringFrequency: plants[name].wateringFrequency,
  }))
}

// to delete a plant
export const deletePlant = (name) => {
  if (!name || typeof name !== "string") {
    throw new Error("Plant name is required and must be a string")
  }

  if (!plants[name]) {
    throw new Error(`Plant "${name}" not found!`)
  }

  const deletedPlant = plants[name]
  delete plants[name]

  return {
    message: `${name} has been deleted.`,
    plant: { name, ...deletedPlant },
  }
}

//to update plant information
export const updatePlant = (name, updates) => {
  if (!name || typeof name !== "string") {
    throw new Error("Plant name is required and must be a string")
  }

  if (!plants[name]) {
    throw new Error(`Plant "${name}" not found!`)
  }

  if (updates.wateringFrequency) {
    const frequency = Number.parseInt(updates.wateringFrequency, 10)
    if (isNaN(frequency) || frequency <= 0) {
      throw new Error("Watering frequency must be a positive number")
    }
    updates.wateringFrequency = frequency
  }

  plants[name] = {
    ...plants[name],
    ...updates,
  }

  return { name, ...plants[name] }
}

//to check which plants need watering
export const checkWateringNeeds = () => {
  const now = new Date()
  const needsWatering = []

  Object.keys(plants).forEach((name) => {
    const plant = plants[name]
    const lastWatered = plant.lastWatered || plant.dateAdded

    if (!lastWatered) {
      needsWatering.push({ name, message: "Never watered" })
      return
    }

    const daysSinceWatered = Math.floor((now - lastWatered) / (1000 * 60 * 60 * 24))
    if (daysSinceWatered >= plant.wateringFrequency) {
      needsWatering.push({
        name,
        daysSinceWatered,
        wateringFrequency: plant.wateringFrequency,
        message: `Needs watering! Last watered ${daysSinceWatered} days ago.`,
      })
    }
  })

  return needsWatering
}

// to save plants data to a JSON file (for persistence)
export const savePlantsToJSON = async (filePath) => {
  if (typeof window === "undefined") {
    try {
    // Only run in Node.js environment
    const fs = await import("fs")
    fs.default.writeFileSync(filePath, JSON.stringify(plants, null, 2))
    return { message: `Plants data saved to ${filePath}` }
  } catch (error) {
    return { message: `Error saving data: ${error.message}` };
  }
}
  return { message: "Save to file is only available in Node.js environment" }
}

// Function to load plants data from a JSON file
export const loadPlantsFromJSON = async (filePath) => {
  if (typeof window === "undefined") {
   try {
    const fs = await import("fs")
    if (fs.default.existsSync(filePath)) {
      const data = fs.default.readFileSync(filePath, "utf8")
      plants = JSON.parse(data)
      return { message: `Plants data loaded from ${filePath}`, count: Object.keys(plants).length }
    }
    return { message: `File ${filePath} not found` }
  } catch (error) {
    return { message: `Error loading data: ${error.message}` };
  }
}
  return { message: "Load from file is only available in Node.js environment" }
}

