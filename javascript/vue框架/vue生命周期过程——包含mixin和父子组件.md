```
// Vue.mixin({
//   data() {
//     console.log(`${this.$options.name}:data(from mixin)`);
//     return {
//       name: 'mixin2',
//     };
//   },

//   beforeCreate() {
//     console.log(`mixin混入:${this.name || '读不到'}:${this.$options.name}:beforeCreate(from mixin)`);
//   },
//   created() {
//     console.log(`mixin混入:${this.name || '读不到'}:${this.$options.name}:created`);
//   },
//   beforeMount() {
//     console.log(`mixin混入:${this.name || '读不到'}:${this.$options.name}:
//      beforeMount(from ${this.from()})`);
//   },
//   mounted() {
//     console.log(`mixin混入:${this.name || '读不到'}:${this.$options.name}:mounted(from )`);
//   },
//   beforeUpdate() {
//     console.log(`mixin混入:${this.name || '读不到'}:${this.$options.name}:beforeUpdate(from )`);
//   },
//   updated() {
//     console.log(`mixin混入:${this.name || '读不到'}:${this.$options.name}:updated(from )`);
//   },
//   beforeDestroy() {
//     console.log(`mixin混入:${this.name || '读不到'}:${this.$options.name}:beforeDestroy(from )`);
//   },
//   Destroy() {
//     console.log(`mixin混入:${this.name || '读不到'}:${this.$options.name}:beforeDestroy(from )`);
//   },
//   methouds: {
//     from() {
//       return 'Minxin3';
//     },
//   },
// });
```

