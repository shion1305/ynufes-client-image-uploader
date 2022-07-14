<template>
  <div id="app">
    <cropper ref="cropper" class="cropper" @change="change" :src="image.src"
    />
    <div class="button-wrapper">
      <button class="button" @click="$refs.file.click()">
        <input
            type="file"
            ref="file"
            @change="uploadImage($event)"
            accept="image/*"
        />
        Upload image
      </button>
      <button class="button" @click="cropImage()">Crop image</button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {Cropper} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default defineComponent({
  components: {
    Cropper,
  },
  data() {
    return {
      image: {
        src:
            "https://images.unsplash.com/photo-1619737307100-55b82496fcda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        type: "image/jpg",
      },
    };
  },
  methods: {
    change(result) {
      console.log(result);
    },
    cropImage() {
      const result = this.$refs.cropper.getResult();
      const newTab = window.open();
      newTab.document.body.innerHTML = `<img src="${result.canvas.toDataURL(
          this.image.type
      )}"></img>`;
    },
    uploadImage(event) {
      /// Reference to the DOM input element
      const {files} = event.target;
      // Ensure that you have a file before attempting to read it
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0]);

        // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
        this.image = {
          src: blob,
          type: files[0].type,
        };
      }
    },
  },
  unmounted() {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src);
    }
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.cropper {
  max-height: 500px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}

.button {
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  width: 100%;
  background: #151515;
  cursor: pointer;
  transition: background 0.5s;
  border: none;

  &:not(:last-of-type) {
    margin-right: 10px;
  }

  &:hover {
    background: #2F2F2F;
  }

  input {
    display: none;
  }
}
</style>
