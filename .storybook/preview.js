import { TeachfloorProvider } from '../src'

export const decorators = [
  (renderStory) => <TeachfloorProvider>{renderStory()}</TeachfloorProvider>
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}