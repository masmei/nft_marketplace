const express = require("express");
const profiles = express.Router();
const {
  getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../queries/profiles");
const { checkName, validateUrl } = require("../validations/checkProfiles")

// INDEX
profiles.get("/", async (req, res) => {
  const allProfiles = await getAllProfiles();
  if (allProfiles[0]) {
    res.status(200).json(allProfiles);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

profiles.get("/:address", async (req, res) => {
  const { address } = req.params;
  const profile = await getProfile(address);
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

profiles.post("/", checkName, async (req, res) => {
  try {
    const profile = await createProfile(req.body);
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

profiles.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProfile = await deleteProfile(id);
  // if our response has an ID we are good to go!
  // an error will NOT have an id
  if (deletedProfile.id) {
    res.status(200).json(deletedProfile);
  } else {
    res.status(404).json("Profile not found!");
  }
});

profiles.put("/:id", checkName, async (req, res) => {
  const { id } = req.params;
  // updatedprofile will either be a MASSIVE error object from SQL
  // OR it will be a profile with the keys and values we expected
  const updatedProfile = await updateProfile(req.body, id);
  if (updatedProfile.id) {
    res.status(200).json(updatedProfile);
  } else {
    res.status(422).json({ error: "Profile not updated for some reason...." });
  }
});

module.exports = profiles;
