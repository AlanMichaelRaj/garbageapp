const mongoose = require('mongoose');

// Correct MongoDB URI (replace <password> with your actual MongoDB password)
const mongoURI = "mongodb+srv://alan:alan1407@cluster0.o4svg.mongodb.net/products?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    // Connect to MongoDB (no deprecated options)
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");

    // Fetch data from "items" collection
    const fetched_data = await mongoose.connection.db.collection("items");
    const data = await fetched_data.find({}).toArray();

    // Fetch data from "itemCategory" collection
    const itemCategory = await mongoose.connection.db.collection("itemCategory");
    const catData = await itemCategory.find({}).toArray(); // Use await to get the data

    // Store data globally
    global.items = data;
    global.itemCategory = catData;
    
    console.log("Data fetched and stored globally.");
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

// Export the function
module.exports = mongoDB;
