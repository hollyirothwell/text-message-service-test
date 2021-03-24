import { APIGatewayEvent } from "aws-lambda";
import * as AWS from "aws-sdk";

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  try {
    const params = {
      Message: `${JSON.stringify(event.body)}`,
      TopicArn: 'arn:aws:sns:eu-west-2:423987200224:TextMessageTopic',
    };

    const notificationService = new AWS.SNS();
    notificationService.publish(params);

    return {
      statusCode: 200,
      body: "Success",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
}
