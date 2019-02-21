import { BottomNav, AppBar, Button, Icon, TextField, Tabs, Progress } from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

let components = [ BottomNav, AppBar, Button, Icon, TextField, Tabs, Progress ];

export default {
  install(Vue) {
    components.forEach(c => {
      Vue.use(c)
    })
  }
}
