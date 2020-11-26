mkdir deploy
cp *.py deploy
cp requirements.txt deploy
cp -r api/ deploy
cd deploy
zip -r ./lambda.zip ./*

# upload to S3
bucket_name="bitcarry.net"
aws s3 cp ./lambda.zip s3://$bucket_name/lambda.zip

# upload to lambda
function_name="ict2x01-api"
aws lambda update-function-code --function-name $function_name --s3-bucket $bucket_name --s3-key lambda.zip

cd ../
rm -rf deploy
