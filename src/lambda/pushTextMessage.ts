import * as AWS from "aws-sdk";

export const handler = async (event: any): Promise<any> => {
  try {
    const publishText = new AWS.SNS();
    event.Records.forEach((record: any) => {
      const params = {
        Message: `${record.body.message}`,
        PhoneNumber: `${record.body.mobilePhone}`,
        TopicArn: 'arn:aws:sns:eu-west-2:423987200224:pushTextMessageTopic',
      };

      publishText.publish(params);
    });

    return {
      statusCode: 200,
      body: "Success in pushing texts",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
}
