import { $ } from "zx";

const startMessage = chalk.blueBright('Start web deploying 🚀')
const uploadToS3Message = chalk.red('Upload build files to AWS S3 ✈️')
const invalidateCacheMessage = chalk.red('Invalidate cloudfront cache 💣')
const endMessage = chalk.magenta('Deployment completed successfully 🎉')
const aws = '/usr/local/bin/aws'

void async function() {
  console.log(startMessage)
  const out = await $`pwd`
  const pwd = out.toString().trim()

  const OUTPUT_DIR = path.join(pwd, '/build')
  const { S3_BUCKET_URI } = process.env
  const { S3_DISTRIBUTION_ID } = process.env

  console.log(uploadToS3Message)
  await $`${aws} s3 sync ${OUTPUT_DIR} ${S3_BUCKET_URI}`

  console.log(invalidateCacheMessage)
  await $`${aws} cloudfront create-invalidation --distribution-id ${S3_DISTRIBUTION_ID} --paths "/*"`

  console.log(endMessage)
}();
