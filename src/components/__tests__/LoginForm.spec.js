import {
  DEFAULT_PLATFORM,
  PLATFORM_OPTIONS,
  getPlatformApiBaseUrl
} from '@/constants/platforms'
import LoginForm from '@/components/LoginForm.vue'
import { useEventyayApi } from '@/stores/eventyayapi'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const push = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push
  })
}))

describe('LoginForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    push.mockClear()
  })

  it('shows the current platform options with Eventyay.com selected by default', () => {
    const wrapper = mount(LoginForm)
    const select = wrapper.get('select')
    const options = wrapper.findAll('option').map((option) => ({
      label: option.text(),
      value: option.element.value
    }))

    expect(options).toEqual(
      PLATFORM_OPTIONS.map((platform) => ({
        label: platform.label,
        value: platform.label
      }))
    )
    expect(select.element.value).toBe(DEFAULT_PLATFORM.label)
    expect(options.map((option) => option.label)).not.toContain(['Open', 'Event'].join('-'))
  })

  it('maps each selectable platform to the expected domain', () => {
    expect(getPlatformApiBaseUrl('Eventyay.com')).toBe('https://eventyay.com/')
    expect(getPlatformApiBaseUrl('Wikimedia')).toBe('https://wikimedia.eventyay.com/')
    expect(getPlatformApiBaseUrl('Testing')).toBe('https://dev.eventyay.com/')
  })

  it('stores the selected platform before registering a device', async () => {
    const wrapper = mount(LoginForm)

    await wrapper.get('select').setValue('Wikimedia')
    await wrapper.findAll('button')[1].trigger('click')

    const processApi = useEventyayApi()
    expect(processApi.servername).toBe('Wikimedia')
    expect(processApi.selectedRole).toBe('CheckIn')
    expect(push).toHaveBeenCalledWith({ name: 'device' })
  })
})
