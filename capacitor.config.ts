import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.codenotes.lab',
  appName: 'Code Notes Lab',
  webDir: 'dist',
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_code_notes',
      iconColor: '#0E7490'
    }
  }
};

export default config;
