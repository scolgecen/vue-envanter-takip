Vue.component("EnvanterList", {
  template: "#envanter-list-template",
  props: {
    title: { type: String, required: true, default: "Liste" },
    items: { type: Array, required: true, default: [] },
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.items.forEach((item) => {
        total += parseFloat(item.fiyat.toString());
      });
      return total.toFixed(2);
    },
    totalItem() {
      let total = 0;
      this.items.forEach((item) => {
        total += parseInt(item.adet.toString());
      });
      return total;
    },
  },

  methods: {
    changeItemStatus(item) {
      item.arsiv = !item.arsiv;
    },
    deleteItem(id) {
      /*this.$parent.$data.allItems = this.$parent.$data.allItems.filter(
        (x) => x.id !== id
      );*/
      this.$emit("item-delete", id);
    },
  },
});

Vue.component("EnvanterForm", {
  template: "#envanter-form-template",
  data() {
    return {
      item: {},
    };
  },
  methods: {
    saveItem() {
      Vue.set(this.item, "id", ++this.$parent.$data.lastId);
      Vue.set(this.item, "arsiv", false);
      this.$parent.$data.allItems.push(this.item);
      this.item = {};
    },
  },
});

const App = new Vue({
  el: "#app",
  data: {
    lastId: 0,
    allItems: [
      {
        id: 1,
        baslik: "Dolap",
        kategori: "Mobilya",
        adet: "1",
        fiyat: 1000,
        arsiv: false,
      },
      {
        id: 2,
        baslik: "laptop",
        kategori: "Elektronik",
        adet: "2",
        fiyat: 1200,
        arsiv: true,
      },
      {
        id: 3,
        baslik: "Klavye",
        kategori: "Elektronik",
        adet: "5",
        fiyat: 225,
        arsiv: true,
      },
      {
        id: 4,
        baslik: "Gömlek",
        kategori: "Giyim",
        adet: "3",
        fiyat: 175,
        arsiv: false,
      },
    ],
    search: "",
    filteredItems: [],
  },
  created() {
    this.lastId = this.allItems.length;
    this.filteredItems = this.allItems;
  },
  computed: {
    activeItems() {
      return this.filteredItems.filter((i) => i.arsiv === false);
    },
    archivedItems() {
      return this.filteredItems.filter((i) => i.arsiv === true);
    },
    totalPriceActive() {
      let total = 0;
      this.activeItems.forEach((item) => {
        total += parseFloat(item.fiyat.toString());
      });
      return total.toFixed(2);
    },
    totalItemActive() {
      let total = 0;
      this.activeItems.forEach((item) => {
        total += parseInt(item.adet);
      });
      return total;
    },
    totalPriceArchive() {
      let total = 0;
      this.archivedItems.forEach((item) => {
        total += parseFloat(item.fiyat.toString());
      });
      return total.toFixed(2);
    },
    totalItemArchive() {
      let total = 0;
      this.archivedItems.forEach((item) => {
        total += parseInt(item.adet);
      });
      return total;
    },
  },
  methods: {
    itemDeleted(id) {
      this.allItems = this.allItems.filter((x) => x.id !== id);
    },
    searchItems() {
      this.filteredItems = [];
      if (this.search.length > 0) {
        this.allItems.forEach((i) => {
          if (i.baslik != null && i.baslik.includes(this.search))
            this.filteredItems.push(i);
        });
      } else {
        this.filteredItems = this.allItems;
      }
    },
  },
});
