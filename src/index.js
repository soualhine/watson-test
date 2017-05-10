/**
* (C) Copyright IBM Corp. 2017. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
* in compliance with the License. You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software distributed under the License
* is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
* or implied. See the License for the specific language governing permissions and limitations under
* the License.
*/

var IBMChat = require('@watson-virtual-agent/chat-widget');

IBMChat.init({
  el: 'ibm_el',
  baseURL: 'https://api.ibm.com/virtualagent/run/api/v1',
  botID: '',         
  XIBMClientID: '',   
  XIBMClientSecret: ''
});

IBMChat.subscribe('action:updateAddress', function(data){
  var addressType = data.message.action.args.address_type;
  var address = {
    type: data.message.action.args.address_type,
    address1: IBMChat.profile.get('user_street_address1'),
    address2: IBMChat.profile.get('user_street_address2'),
    city: IBMChat.profile.get('user_locality'),
    region: IBMChat.profile.get('user_state_or_province'),
    postalCode: IBMChat.profile.get('user_zipcode')
  }
  function error() {
    IBMChat.sendSilently('failure');
  }
  function success() {
    IBMChat.sendSilently('success');
  }

  myFakePostCommand(address, error, success);
});

function myFakePostCommand(data, errorCallback, successCallback) {
  function isNotEmpty(item) {
    if (typeof item === 'string' && item.trim().length > 0)
      return true;
    return false;
  }
  if (isNotEmpty(data.type) && isNotEmpty(data.address1) && isNotEmpty(data.city) && isNotEmpty(data.region) && isNotEmpty(data.postalCode))
    successCallback(); 
  else
    errorCallback(); 
}
