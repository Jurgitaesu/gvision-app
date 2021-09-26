const objectsDb = require('../schemas/objectsSchema');
const { cloudinary } = require('../cloudinary');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyFilename: '../APIkey.json',
});

module.exports = {
  upload: async (req, res) => {
    try {
      const fileURL = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileURL, {
        upload_preset: 'cloudinary_react',
      });
      const imageURL = uploadResponse.url;
      const [result] = await client.objectLocalization(`${imageURL}`);
      const objects = result.localizedObjectAnnotations;
      let objectsArr = [];
      console.log('Object(s):');
      objects.forEach((object) => {
        console.log(object.name);
        objectsArr.push(object.name);
      });
      if (objectsArr.length > 0) {
        try {
          const objects = new objectsDb();
          objects.objects = objectsArr;
          await objects.save();
        } catch {
          return res.send({ error: true, message: 'Error writting to DB' });
        }
      } else {
        console.log('No objects found on image');
      }
      let latestSearches = [];
      const objectsOnDb = await objectsDb.find({}).sort({ $natural: -1 }).limit(5);
      console.log('Up to 5 latest searches: ');
      objectsOnDb.forEach((objectOnDb, index) => {
        console.log(`${index + 1}. ${objectOnDb.objects}`);
        latestSearches.push(`${index + 1}. ${objectOnDb.objects}`);
      });
      if (latestSearches.length === 0) {
        console.log('No searches are saved on DB');
      }
      return res.send({ error: false, message: 'Image uploaded successfully' });
    } catch (err) {
      console.log(err);
      res.send({ error: true, message: err });
    }
  },
};
