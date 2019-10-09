const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env.AWS_REGION
})

const documentCliente = new AWS.DynamoDB.DocumentClient()
const uuid = require('uuid/v4')

module.exports.create = async event => {
  const body = JSON.parse(event.body)
  await documentCliente.put({
      TableName: process.env.DYNAMODB_BOOKINGS,
      Item: {
        id: uuid(),
        date: body.date,
        user: event.requestContext.authorizer
      }
   
  }).promise()
     
  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Agendamento Efetuado com sucesso!'})
  }
}