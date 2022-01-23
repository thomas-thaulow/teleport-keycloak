/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { Context, ContextProvider } from 'teleport';
import Recordings from './Recordings';
import { makeRecording } from 'teleport/services/recordings/makeRecording';

export default {
  title: 'Teleport/Recordings',
};

export const Loaded = () => {
  const ctx = new Context();
  ctx.recordingsService.fetchRecordings = () =>
    Promise.resolve({
      recordings: recordings.map(makeRecording),
      startKey: '',
    });

  return render(ctx);
};

export const LoadedFetchMore = () => {
  const ctx = new Context();
  ctx.recordingsService.fetchRecordings = () =>
    Promise.resolve({
      recordings: recordings.map(makeRecording),
      startKey: 'some-key',
    });

  return render(ctx);
};

export const Processing = () => {
  const ctx = new Context();
  ctx.recordingsService.fetchRecordings = () => new Promise(() => null);
  return render(ctx);
};

export const Failed = () => {
  const ctx = new Context();
  ctx.recordingsService.fetchRecordings = () =>
    Promise.reject(new Error('server error'));
  return render(ctx);
};

function render(ctx) {
  const history = createMemoryHistory({
    initialEntries: ['/web/cluster/localhost/audit/events'],
    initialIndex: 0,
  });

  return (
    <ContextProvider ctx={ctx}>
      <Router history={history}>
        <Recordings />
      </Router>
    </ContextProvider>
  );
}

const recordings = [
  // desktop recording
  {
    cluster_name: 'Isaiahs-MacBook-Pro.local',
    code: 'TDP01I',
    desktop_addr: '172.16.97.130:3389',
    desktop_labels: {
      env: 'prod',
      foo: 'bar',
      'teleport.dev/computer_name': 'WIN-JR2L4P7KN15',
      'teleport.dev/dns_host_name': 'WIN-JR2L4P7KN15.teleport.dev',
      'teleport.dev/origin': 'dynamic',
      'teleport.dev/os': 'Windows Server 2012 R2 Standard Evaluation',
      'teleport.dev/os_version': '6.3 (9600)',
      'teleport.dev/windows_domain': 'teleport.dev',
    },
    desktop_name: 'WIN-JR2L4P7KN15-teleport-dev',
    ei: 0,
    event: 'windows.desktop.session.end',
    login: 'Administrator',
    session_recording: 'node',
    session_start: '2022-01-19T15:49:47.939Z',
    session_stop: '2022-01-19T15:49:50.18Z',
    sid: 'fe41659b-a611-4b08-974b-69564f766403',
    time: '2022-01-19T15:49:50.182Z',
    uid: '1540d599-b868-4afb-8bcd-1da98c18c9f9',
    user: 'joe',
    windows_desktop_service: '8f1ed2bc-65fb-48de-b32f-cac76676f8db',
    windows_domain: 'teleport.dev',
    windows_user: 'Administrator',
  },
  // desktop recording with session_recording set to "off"
  {
    cluster_name: 'Isaiahs-MacBook-Pro.local',
    code: 'TDP01I',
    desktop_addr: '172.16.97.130:3389',
    desktop_labels: {
      env: 'prod',
      foo: 'bar',
      'teleport.dev/computer_name': 'WIN-JR2L4P7KN15',
      'teleport.dev/dns_host_name': 'WIN-JR2L4P7KN15.teleport.dev',
      'teleport.dev/origin': 'dynamic',
      'teleport.dev/os': 'Windows Server 2012 R2 Standard Evaluation',
      'teleport.dev/os_version': '6.3 (9600)',
      'teleport.dev/windows_domain': 'teleport.dev',
    },
    desktop_name: 'WIN-JR2L4P7KN15-teleport-dev',
    ei: 0,
    event: 'windows.desktop.session.end',
    login: 'Administrator',
    session_recording: 'off',
    session_start: '2022-01-19T15:19:41.553Z',
    session_stop: '2022-01-19T15:19:46.991Z',
    sid: '3b8d6d4b-1096-43e8-a18c-1ce784911a8e',
    time: '2022-01-19T15:19:46.992Z',
    uid: '5bfce6cd-94ac-4545-9d27-0afa6d39b682',
    user: 'joe',
    windows_desktop_service: '8f1ed2bc-65fb-48de-b32f-cac76676f8db',
    windows_domain: 'teleport.dev',
    windows_user: 'Administrator',
  },
  {
    code: 'T2004I',
    ei: 10,
    event: 'session.end',
    namespace: 'default',
    sid: '426485-6491-11e9-80a1-427cfde50f5a',
    time: '2019-04-22T00:00:51.543Z',
    uid: '6bf836ee-197c-453e-98e5-31511935f22a',
    user: 'admin@example.com',
    participants: ['one', 'two'],
    server_id: 'serverId',
    server_hostname: 'apple-node',
    interactive: true,
    session_start: '2021-07-22T02:11:14.664957198Z',
    session_stop: '2021-07-22T02:30:35.951372322Z',
  },
  {
    code: 'T2004I',
    ei: 10,
    event: 'session.end',
    namespace: 'default',
    sid: '377875-6491-11e9-80a1-427cfde50f5a',
    time: '2019-04-22T00:00:51.543Z',
    uid: '6bf836ee-197c-453e-98e5-31511935f22a',
    user: 'admin@example.com',
    participants: ['one', 'two'],
    server_id: 'serverId',
    server_hostname: 'peach-node',
    interactive: true,
    session_start: '2021-07-22T02:11:14.664957198Z',
    session_stop: '2021-07-22T02:11:35.951372322Z',
  },
  // session_recording is off
  {
    cluster_name: 'im-a-cluster-name',
    code: 'T2004I',
    ei: 3,
    enhanced_recording: false,
    event: 'session.end',
    interactive: true,
    namespace: 'default',
    participants: ['test'],
    server_addr: '192.168.0.103:3022',
    server_hostname: 'im-a-nodename',
    server_id: 'b01d1943-c6fe-4a25-699065c29671',
    session_recording: 'off',
    session_start: '2021-07-27T23:19:58.420469454Z',
    session_stop: '2021-07-27T23:30:05.345820925Z',
    sid: 'd183ca84-dd94-434a-afee5c2c5f38',
    time: '2021-07-27T23:20:05.346Z',
    uid: '162eac0d-dbd6-47ef-f38b032b3027',
    user: 'test',
  },
  // non-interactive
  {
    cluster_name: 'kimlisa.cloud.gravitational.io',
    code: 'T2004I',
    ei: 1,
    enhanced_recording: false,
    event: 'session.end',
    interactive: false,
    login: 'root',
    namespace: 'default',
    participants: ['foo'],
    server_addr: '172.31.30.254:32962',
    server_hostname: 'ip-172-31-30-254',
    server_id: 'd3ddd1f8-b602-488b-00c66e29879f',
    session_start: '2021-05-21T22:53:55.313562027Z',
    session_stop: '2021-05-21T22:54:27.122508023Z',
    sid: '9d92ad96-a45c-4add-463cc7bc48b1',
    time: '2021-05-21T22:54:27.123Z',
    uid: '984ac949-6605-4f0a-e450aa5665f4',
    user: 'foo',
  },
];
