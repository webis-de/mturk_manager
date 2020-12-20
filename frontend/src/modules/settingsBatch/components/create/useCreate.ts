import { Ref, ref } from '@vue/composition-api';
import { SettingsBatch } from '@/modules/settingsBatch/settingsBatch.model';
import useVuelidate from '@vuelidate/core';
import { ServiceSettingsBatch } from '@/modules/settingsBatch/settingsBatch.service';

export function useCreate({ emit }: { emit: (event: string, ...args: unknown[]) => void }): {
  settingsBatchNew: Ref<SettingsBatch>,
  reset: () => void,
  v: unknown,
  create: ({ close }: {close:() => void}) => Promise<void>,
} {
  const settingsBatchNew = ref(new SettingsBatch());
  const v = useVuelidate(ServiceSettingsBatch.getRules(), settingsBatchNew);

  const reset = () => {
    settingsBatchNew.value = new SettingsBatch();
    v.value.$reset();
  };

  return {
    settingsBatchNew,
    reset,
    v,
    create: async ({ close }) => {
      const isValid = await v.value.$validate();

      if (isValid) {
        ServiceSettingsBatch.create({
          settingsBatch: settingsBatchNew.value,
        }).then(() => {
          close();
          emit('created');
          reset();
        });
      }
    },
  };
}
