import { $ } from "zx";

const startMessage = chalk.blueBright('Start web deploying 🚀')
const endMessage = chalk.magenta('Deployment completed successfully 🎉')
const aws = '/usr/local/bin/aws'

void async function() {
  console.log(startMessage)
  const out = await $`pwd`
  const pwd = out.toString().trim()

  const OUTPUT_DIR = path.join(pwd, '/build')
  const { S3_BUCKET_URI } = process.env

  await $`${aws} s3 sync ${OUTPUT_DIR} ${S3_BUCKET_URI}`
  console.log(endMessage)
}();
