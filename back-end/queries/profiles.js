const db = require("../db/dbConfig.js");

const getAllProfiles = async () => {
    try {
        const allProfiles = await db.any("SELECT * FROM Profiles");
        return allProfiles;
      } catch (error) {
        return error;
      }
};

const getProfile = async (address) => {
  try {
    // db one takes a string of SQL command;
    // id=$1 allows us to interpolate our second parameter safely
    // we CAN pass multiple values to one query in this manner
    const oneProfile = await db.one("SELECT * FROM profiles WHERE address=$1", address);
    return oneProfile;
  } catch (error) {
    // with using db.one() we will not hit our catch block even if we have no
    // record with the corresponding ID - there are MANY ways to handle this
    // db.oneOrNone() is one way - there are also others.
    return error;
  }
};

const createProfile = async (profile) => {
  let { address, name, twitter, instagram, linkedin, picture, about } = profile;

  if(!picture){
    picture = "https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-logo-6278329_960_720.png"
  }

  try {
    const newProfile = await db.one(
      "INSERT INTO profiles (address, name, twitter, instagram, linkedin, picture, about) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [address, name, twitter, instagram, linkedin, picture, about]
    );
    return newProfile;
  } catch (error) {
    return error;
  }
};

const deleteProfile = async (id) => {
  try {
    const deletedProfile = await db.one("DELETE FROM profiles WHERE id = $1 RETURNING *", id);
    return deletedProfile;
  } catch (err) {
    return err;
  }
};
// We need to pass in the Profile - the information to change
// && the ID of the Profile to access it in the DB
const updateProfile = async (profile, id) => {
  let { address, name, twitter, instagram, linkedin, picture, about } = profile;

  if(!picture){
    picture = "https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-logo-6278329_960_720.png"
  }

  try {
    // first argument is the QUERY string
    // second argument is the actual DATA 
    const updatedProfile = await db.one("UPDATE profiles SET address = $1, name = $2, twitter = $3, instagram = $4, linkedin = $5, picture = $6, about = $7 WHERE id = $8 RETURNING *",
    // remember the order MATTERS here 
    // $1  $2   $3        $4           $5
    [address, name, twitter, instagram, linkedin, picture, about, id]);
    return updatedProfile;
  } catch (err) {
    return err;
  }
}


module.exports = { getAllProfiles, getProfile, createProfile, updateProfile, deleteProfile };