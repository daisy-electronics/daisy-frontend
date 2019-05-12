import axios from 'axios';

import { CustomError } from '../../common/errors';
import garden from './garden';

export default {
  namespaced: true,
  actions: {
    async $init(context, store) {
      await context.dispatch('garden/$init', store);
    },
    async getVariable(context, { viewId, variable }) {
      try {
        const response = await axios.get(`/api/view/${viewId}/${variable}`);
        return response.data;
      } catch (error) {
        console.error(`Failed to get view variable.`, error);
        if (error.response) {
          throw new CustomError(error.response.data.message, error.response.data.data);
        } else {
          throw new CustomError(error.message, error.data);
        }
      }
    },
    async dispatchAction(context, { viewId, action, data }) {
      try {
        const response = await axios.post(`/api/view/${viewId}/${action}`, {
          ...typeof data !== 'undefined' ? { data } : {}
        });
        return response.data;
      } catch (error) {
        console.error(`Failed to get view variable.`, error);
        if (error.response) {
          throw new CustomError(error.response.data.message, error.response.data.data);
        } else {
          throw new CustomError(error.message, error.data);
        }
      }
    }
  },
  modules: {
    garden
  }
};