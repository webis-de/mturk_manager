import _ from 'lodash';
import { ServiceEndpoint } from './endpoint.service';
import { store } from '../store/vuex';
import Batch from '../classes/batch';
import { BaseLoadPageService } from './baseLoadPage.service';
import { convertRewardFromMturkToModel } from '../helpers';

class ClassServiceBatches extends BaseLoadPageService {
  // async load_batches(force=false)
  // {
  //  const use_sandbox = store.state.module_app.use_sandbox;
  //
  //  if(store.getters['moduleBatches/get_object_batches'](use_sandbox) == null || force) {
  //         const response = await ServiceEndpoint.makeRequest({
  //             method: 'get',
  //             url: {
  //                 url: store.getters["get_url"]('url_api_projects_batches', 'moduleBatches'),
  //                 use_sandbox,
  //                 project: store.getters['moduleProjects/get_project_current'],
  //             },
  //         });
  //
  //         const data_batches = response.data;
  //
  //         store.commit('moduleBatches/set_batches', {
  //             data_batches,
  //             use_sandbox
  //         });
  //
  //         await ServiceHITs.set_hits({
  //             object_batches: store.getters['moduleBatches/get_object_batches'](use_sandbox),
  //             data_batches,
  //             use_sandbox
  //         });
  //     }
  // }

  async create(data) {
    const { use_sandbox } = store.state.module_app;
    const project = store.getters['moduleProjects/get_project_current'];

    await ServiceEndpoint.makeRequest({
      method: 'post',
      url: {
        path: store.getters.get_url(
          'url_api_projects_batches',
          'moduleBatches',
        ),
        use_sandbox,
        project,
      },
      data,
    });

    // store.commit('moduleBatches/add_batch', {
    //     data_batch: response.data,
    //     use_sandbox,
    // });

    // store.commit('moduleHITs/set_hits', {
    //     'object_batches': store.getters['moduleBatches/get_object_batches'](use_sandbox),
    //     'data_batches': [response.data],
    //     use_sandbox
    // });
  }

  async syncMturk() {
    const { use_sandbox } = store.state.module_app;
    const project = store.getters['moduleProjects/get_project_current'];

    store.commit('moduleBatches/set_is_syncing_mturk', true);
    await ServiceEndpoint.makeRequest({
      method: 'patch',
      url: {
        path: store.getters.get_url(
          'url_api_projects_batches',
          'moduleBatches',
        ),
        project,
        use_sandbox,
      },
    });

    // await ServiceHITs.append_hits({
    //     data_batches,
    //     use_sandbox
    //
    // });

    store.commit('moduleBatches/set_is_syncing_mturk', false);
  }

  // add_workers({object_workers, use_sandbox})
  // {
  //     store.commit('moduleBatches/add_workers', {
  //         object_workers,
  //         use_sandbox,
  //     });
  // }

  async load_page(pagination, filters) {
    const useSandbox = store.state.module_app.use_sandbox;

    return ClassServiceBatches.loadPageInternal({
      pagination,
      filters,
      url: {
        path: store.getters.get_url(
          'url_api_projects_batches',
          'moduleBatches',
        ),
        use_sandbox: useSandbox,
        project: store.getters['moduleProjects/get_project_current'],
      },
      callback(response) {
        store.commit('moduleBatches/setState', {
          objectState: response.data.data.map((batch) => new Batch(batch)),
          nameState: useSandbox === true ? 'arrayBatchesSandbox' : 'arrayBatches',
        });
      },
    });
  }

  async getBatch(idBatch) {
    const response = await ServiceEndpoint.makeRequest({
      method: 'get',
      url: {
        path: store.getters.get_url(
          'url_api_projects_batches',
          'moduleBatches',
        ),
        project: store.getters['moduleProjects/get_project_current'],
        value: idBatch,
      },
      params: {
        expand: '__settings_batch__template_worker__',
      },
    });

    return new Batch(response.data);
  }

  async download(data) {
    const response = await ServiceEndpoint.makeRequest({
      method: 'post',
      url: {
        path: store.getters.get_url(
          'url_api_projects_batches_download',
          'moduleBatches',
        ),
        project: store.getters['moduleProjects/get_project_current'],
      },
      data,
      options: {
        responseType: 'blob',
      },
    });

    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(response.data, { type: 'text/plain' });
    a.download = 'filename.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async getDownloadInfo(params) {
    const response = await ServiceEndpoint.makeRequest({
      method: 'get',
      url: {
        path: store.getters.get_url(
          'url_api_projects_batches_download_info',
          'moduleBatches',
        ),
        project: store.getters['moduleProjects/get_project_current'],
      },
      params,
    });

    return response;
  }

  isValidCSV() {
    if (store.state.moduleBatches.objectCSVParsed === null) {
      return false;
    }
    return store.state.moduleBatches.objectCSVParsed.errors.length === 0;
  }

  async importBatches({
    nameBatch, nameSettingsBatch, templateWorker, parsedCSVs,
  }) {
    await ServiceEndpoint.makeRequest({
      method: 'post',
      url: {
        path: store.getters.get_url(
          'urlApiProjectsBatchesImport',
          'moduleBatches',
        ),
        project: store.getters['moduleProjects/get_project_current'],
      },
      data: {
        nameBatch,
        templateWorker,
        parsedCSVs,
        name_settings_batch: nameSettingsBatch,
      },
    });
  }

  async findSettingsBatch(assignments) {
    const response = await ServiceEndpoint.makeRequest({
      method: 'get',
      url: {
        path: store.getters.get_url(
          'urlApiProjectsSettingsBatch',
          'moduleSettingsBatch',
        ),
        project: store.getters['moduleProjects/get_project_current'],
      },
      params: {
        page: 1,
        page_size: 1,
        model__title: assignments[0].Title,
        model__description: assignments[0].Description,
        model__reward: convertRewardFromMturkToModel(assignments[0].Reward),
        model__duration: assignments[0].AssignmentDurationInSeconds,
        model__count_assignments: Object.values(_.countBy(assignments.map((assignment) => assignment.HITId)))
          .sort((a, b) => a - b).reverse()[0],
      },
    });

    return response.data;
  }
}

export const ServiceBatches = new ClassServiceBatches();
