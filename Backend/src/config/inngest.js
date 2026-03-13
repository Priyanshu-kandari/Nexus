const { Inngest } = require("inngest");
const connectDB = require("../DB/db.js");
const UserModel = require("../models/User.model.js");

const inngest = new Inngest({ id: "Nexus" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },

  async ({ event }) => {
    try {
      await connectDB();

      const { id, email_addresses, first_name, last_name, image_url } = event.data;

      const newUser = {
        clerkId: id,
        email: email_addresses?.[0]?.email_address || "",
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        image: image_url,
      };

      await UserModel.findOneAndUpdate(
        { clerkId: id },
        newUser,
        { upsert: true, new: true }
      );

      console.log("User synced");
    } catch (error) {
      console.error("Error syncing user:", error);
    }
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    try {
      await connectDB();

      const { id } = event.data;

      await UserModel.deleteOne({ clerkId: id });

      console.log("User deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
);

module.exports = { inngest, functions: [syncUser, deleteUser] };