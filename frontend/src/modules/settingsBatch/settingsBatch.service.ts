import { store } from '@/store/vuex';
import {
  queryCreateSettingsBatch,
  queryDeleteSettingsBatch,
  querySettingsBatch, queryUpdateSettingsBatch,
} from '@/modules/settingsBatch/settingsBatch.graphql';
import { SettingsBatch } from '@/modules/settingsBatch/settingsBatch.model';
import { ServiceEndpoint } from '@/services/endpoint.service';
import { maxValue, minValue, required } from '@vuelidate/validators';

class ClassServiceSettingsBatch {
  async loadSettingsBatch() {
    const response = await ServiceEndpoint.apolloClient.query({
      query: querySettingsBatch,
      variables: {
        project: store.getters['moduleProjects/get_project_current'].id,
      },
      fetchPolicy: 'no-cache',
    });

    store.commit('moduleSettingsBatch/setSettingsBatch', {
      settingsBatches: await SettingsBatch.convertFromServerToStore<SettingsBatch>(response.data.settingsBatch),
    });
  }

  async create({
    settingsBatch,
  }: { settingsBatch: SettingsBatch }) {
    const response = await ServiceEndpoint.apolloClient.query({
      query: queryCreateSettingsBatch,
      variables: {
        settingsBatch: settingsBatch.prepareForServer(),
      },
      fetchPolicy: 'no-cache',
    });

    store.commit('moduleSettingsBatch/createSettingsBatch', {
      settingsBatch: await SettingsBatch.parseFromServer(response.data.createSettingsBatch.settingsBatch),
    });
  }

  async update({
    settingsBatch,
  }: { settingsBatch: SettingsBatch }) {
    const response = await ServiceEndpoint.apolloClient.query({
      query: queryUpdateSettingsBatch,
      variables: {
        settingsBatch: settingsBatch.prepareForServer(),
      },
      fetchPolicy: 'no-cache',
    });

    store.commit('moduleSettingsBatch/updateSettingsBatch', {
      settingsBatch: await SettingsBatch.parseFromServer(response.data.updateSettingsBatch.settingsBatch),
    });
  }

  async delete({
    settingsBatch,
  }: { settingsBatch: SettingsBatch }) {
    await ServiceEndpoint.apolloClient.query({
      query: queryDeleteSettingsBatch,
      variables: {
        id: settingsBatch.id,
      },
      fetchPolicy: 'no-cache',
    });

    store.commit('moduleSettingsBatch/deleteSettingsBatch', {
      settingsBatch,
    });
  }

  getRules() {
    return {
      name: {
        required,
      // is_unique: foo(
      //   this.project_current.settings_batch,
      //   this.settingsBatch,
      // ),
      },
      title: {
        required,
      },
      description: {
        required,
      },
      reward: {
        required,
        minValue: minValue(0),
      },
      countAssignments: {
        required,
        minValue: minValue(1),
      },
      // countAssignmentsMaxPerWorker: {
      //   minValue: minValue(0),
      // },
      lifetime: {
        required,
        minValue: minValue(0),
      },
      duration: {
        required,
        minValue: minValue(30),
        maxValue: maxValue(31536000),
      },
      templateWorker: {
        required,
      },
      blockWorkers: {
        required,
      },
      keywords: { },
      hasContentAdult: { required },
      qualificationAssignmentsApproved: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      qualificationHitsitsApproved: {
        minValue: minValue(0),
      },
      qualificationLocale: {},
    };
  }
}

export const ServiceSettingsBatch = new ClassServiceSettingsBatch();
