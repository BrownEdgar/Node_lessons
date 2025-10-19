const AWS = require('aws-sdk');

// Configure AWS S3
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

/**
 * Upload file to S3
 */
const uploadFile = async (file, fileName, options = {}) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file.buffer || file,
    ContentType: file.mimetype || options.contentType || 'application/octet-stream',
    ACL: options.acl || 'public-read',
    Metadata: options.metadata || {},
  };

  try {
    const result = await s3.upload(params).promise();

    return {
      url: result.Location,
      key: result.Key,
      bucket: result.Bucket,
      etag: result.ETag,
    };
  } catch (error) {
    throw new Error(`S3 upload failed: ${error.message}`);
  }
};

/**
 * Get file from S3
 */
const getFile = async (key) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  try {
    const result = await s3.getObject(params).promise();
    return result.Body;
  } catch (error) {
    throw new Error(`S3 get file failed: ${error.message}`);
  }
};

/**
 * Delete file from S3
 */
const deleteFile = async (key) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    throw new Error(`S3 delete failed: ${error.message}`);
  }
};

/**
 * Generate signed URL for private files
 */
const getSignedUrl = (key, expiresIn = 3600) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Expires: expiresIn, // seconds
  };

  return s3.getSignedUrl('getObject', params);
};

/**
 * List files in bucket
 */
const listFiles = async (prefix = '') => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Prefix: prefix,
  };

  try {
    const result = await s3.listObjectsV2(params).promise();
    return result.Contents;
  } catch (error) {
    throw new Error(`S3 list files failed: ${error.message}`);
  }
};

module.exports = {
  uploadFile,
  getFile,
  deleteFile,
  getSignedUrl,
  listFiles,
};
