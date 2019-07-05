// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import browser from "webextension-polyfill";
const  codeExport = require('code-export-node-nr-synthetics')


const chromeID=process.env.SIDE_ID;
var interval;


const payload= {
    name: "New Relic Selenium IDE plugin",
    version: "1.0.0",
    exports:{vendor:[{"nrsynthetics":"New Relic Synthetics"}]}
  }


startPolling(payload, _=>{})

browser.runtime.onMessageExternal.addListener(   (message, sender, sendResponse) => {

  if (message.action === 'export') {
    let funcExport = (typeof message.options.suite != 'undefined')?codeExport.emitSuite : codeExport.emitTest
    funcExport(parseMessage(message)).then( sendResponse)
    return true
  }
});





function register(){
  browser.runtime.sendMessage(chromeID, {
    uri: "/register",
    verb: "post",
    payload
  }).catch(console.error);

}


function parseMessage(message){
  let data= message.options
  data.baseUrl=  message.options.url
  return data
}


function sendMessage(payload) {
  return browser.runtime.sendMessage(chromeID, payload);
}

function startPolling(payload, cb) {
  interval = setInterval(() => {
    sendMessage({
      uri: "/health",
      verb: "get"
    }).catch(res => ({error: res.message})).then(res => {
      if (!res) {
        sendMessage({
          uri: "/register",
          verb: "post",
          payload
        }).then(() => {
          console.log("registered");
          cb();
        });
      } else if (res.error) {
        cb(new Error(res.error));
      }
    });
  }, 1000);
}

function stopPolling() {
  clearInterval(interval);
}
