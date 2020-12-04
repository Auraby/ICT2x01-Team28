# upload to S3
bucket_name="ict2x01.bitcarry.net"
npm run build
aws s3 cp ./build s3://$bucket_name/ --recursive
rm -rf ./build/