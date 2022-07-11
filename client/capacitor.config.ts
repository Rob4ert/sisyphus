import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'sisyphus',
  webDir: 'src',
  bundledWebRuntime: false,
  server: {
    url: 'http://172.23.96.1:4200',
    cleartext: true
  },
};

export default config;
