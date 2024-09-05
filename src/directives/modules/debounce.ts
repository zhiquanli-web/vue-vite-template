import type { IDirectiveOptions, IELType } from '../types';

const focusDirective: IDirectiveOptions<'vDebounce'> = {
  name: 'debounce',
  directive: {
    mounted: (el: IELType, { value }, vnode) => {
      const { type = 'input', delay, callback } = value;
      el.__fn__ = useDebounceFn(callback.bind(vnode), delay ?? 300);
      el.addEventListener(type, el.__fn__);
    },
    beforeUnmount: (el: IELType, { value }) => {
      el.removeEventListener(value.type || 'input', el.__fn__);
    },
  },
};

export default focusDirective;
