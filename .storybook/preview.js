import React from 'react';

import { addDecorator } from '@storybook/react';
import EgThemeProvider from '@eGroupAI/material/EgThemeProvider';
import createEgTheme from '@eGroupAI/material/stylesheet/createEgTheme';
import '@eGroupAI/material/stylesheet/styles.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'froala-editor/js/plugins.pkgd.min';
import '@eGroupAI/material-module/FroalaEditor/styles.css';
import '@eGroupAI/material-module/FroalaEditor/lang/zh_tw';
import 'swiper/css'
import 'swiper/css/bundle'
import './icomoon-styles.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const egTheme = createEgTheme()

console.log(egTheme)

addDecorator((story) => (
  <EgThemeProvider theme={egTheme}>
    {story()}
  </EgThemeProvider>
));