const { Inngest } = require("inngest");
const { connectDB } = require("../DB/db");
const { UserModel } = require("../models/User.model");

const inngest = new Inngest({ id: "Nexus" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },

  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      image: image_url,
    };

    await UserModel.create(newUser);
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await UserModel.deleteOne({ clerkId: id });
  }
);

module.exports = { inngest, functions: [syncUser, deleteUser] };