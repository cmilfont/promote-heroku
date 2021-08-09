import { Injectable } from '@nestjs/common';
import * as https from 'https';

@Injectable()
export class AppService {

  async promote(payload) {
    const data = JSON.stringify({
      "pipeline":{
        "id": `${payload.pipelineId}`
      },
      "source":{
        "app":{
          "id": `${payload.stagingId}`
        }
      },
      "targets":[
        {
          "app":{
            "id": `${payload.productionId}`
          }
        }
      ]
    });

    const options = {
      hostname: 'api.heroku.com',
      port: 443,
      path: '/pipeline-promotions',
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${payload.token}`,
        'Content-Length': data.length,
      },
    };

    function httpRequest(params, postData) {
      return new Promise(function(resolve, reject) {

        const req = https.request(params, res => {
          console.log(`statusCode: ${res.statusCode}`)
          const body = [];
          res.on('data', function(chunk) {
              body.push(chunk);
          });
          res.on('end', function() {
            try {
              const response = JSON.parse(Buffer.concat(body).toString());
              resolve(response);
            } catch(e) {
              reject(e);
            }
          });
        })
        
        req.on('error', error => {
          console.error(error)
          console.log('problem with request: ' + error.message);
          reject(error);
        })
        
        req.write(postData)
        req.end();
      });
    }
    return httpRequest(options, data);
  }
}
