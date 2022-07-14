<script setup lang="ts">
import 'vue-advanced-cropper/dist/style.css';
import {Cropper} from "vue-advanced-cropper";
import {ref} from "vue";

let img = ref({
  src:
      "",
  type: "",
});
let cropper111 = ref(null);

const uploadImage = function (e: any) {
  const { files } = e.target;
  if (files && files[0]) {
    if (img.value.src) {
      URL.revokeObjectURL(img.value.src);
    }
    const blob = URL.createObjectURL(files[0]);
    img.value.src = blob;
    img.value.type= files[0].type;
  }
}
const crop=function () {
  if (cropper111.value) {
    const result = cropper111.value.getResult();
    img.value.src=result.canvas.toDataURL(img.value.type);
  }
}
</script>

<template>
  <div class="home">
    <h1>広告画像提出フォーム</h1>
    <div v-show="img.src.length===0">画像が選択されていません。</div>
    <cropper
        v-show="img.src.length!==0"
        ref="cropper111"
        class="cropper"
        :src="img.src"
        :stencil-props="{aspectRatio: 3}"
    />
    <button class="button" @click="$refs.file.click()">
      <input
          type="file"
          ref="file"
          @change="uploadImage($event)"
          accept="image/*"
      />
      画像を選択する
    </button>
    <button class="button" @click="crop">画像を切り取る</button>
  </div>
</template>
<style lang="scss">
.button {
  input {
    display: none;
  }
}
.cropper {
  max-height: 500px;
}
</style>
