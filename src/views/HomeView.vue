<script setup lang="ts">
import 'vue-advanced-cropper/dist/style.css';
import {Cropper} from "vue-advanced-cropper";
import {ref} from "vue";
import store from "@/store";

let img = ref({
  src: "",
  type: "",
  width: 0,
  height: 0
});
let cropper111 = ref(null);

let editMode = ref(false);

const uploadImage = function (e: Event) {
  editMode.value=false;
  const {files} = e.target;
  if (files && files[0]) {
    if (img.value.src) {
      URL.revokeObjectURL(img.value.src);
    }
    const blob = URL.createObjectURL(files[0]);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext('2d');
    var base_image = new Image();
    base_image.src = blob;
    base_image.onload = function () {
      canvas.width = base_image.width;
      canvas.height = base_image.height;
      context.drawImage(base_image, 0, 0);
      img.value = {
        src: canvas.toDataURL(img.value.type),
        type: files[0].type,
        width: base_image.width,
        height: base_image.height
      };
      store.commit("setImage", img.value);
      canvas.remove();
    };
  }
}

const downloadImage = () => {
  const link = document.createElement("a");
  link.href = img.value.src;
  link.download = "バナー広告-YNUFES.png";
  link.click();
}
const crop = function () {
  if (cropper111.value) {
    const result = cropper111.value.getResult();
    const data = result.canvas.toDataURL(img.value.type);
    store.commit("setImage", {src: data, type: img.value.type});
    img.value.src = data;
    img.value.height = result.canvas.height;
    img.value.width = result.canvas.width;
    editMode.value = false;
  }
}

const imgStatus = function (): number {
  if (!img.value.src) return 0;
  console.log(img.value.width, img.value.height);
  if (img.value.height === 200 && img.value.width === 600) return 2;
  return 1;
}
</script>

<template>
  <div class="home">
    <h1>バナー広告チェッカー</h1>
    <div class="status_field" v-show="imgStatus()===0"><img src="@/assets/warning.png" alt="icon_warning">画像が選択されていません
    </div>
    <div class="status_field" v-show="imgStatus()===1"><img src="@/assets/cross.png" alt="icon_not_satisfied">サイズを満たしていません
    </div>
    <div class="status_field" v-show="imgStatus()===2"><img src="@/assets/checked.png" alt="icon_satisfied">サイズを満たしています。
    </div>
    <div class="buttonRow">
      <button class="button" :class="(imgStatus()===0)?'green':''" @click="$refs.file.click();">
        <input
            type="file"
            ref="file"
            @change="uploadImage($event)"
            accept="image/*"
        />
        {{ imgStatus() !== 0 ? '別の' : '' }}画像を選択する
      </button>
      <button v-show="imgStatus()!==0" :class="{button:true, green:(imgStatus()===1&&!editMode)}" @click="()=>{editMode=!editMode}">切り取って調整する</button>
    </div>
    <img v-show="!editMode" class="main-preview" v-if="imgStatus()>0" :src="img.src"/>
    <div v-show="imgStatus()!==0">サイズ 横:{{ img.width }} 縦:{{ img.height }}</div>
    <cropper
        v-if="editMode"
        ref="cropper111"
        class="cropper"
        :src="img.src"
        :stencil-props="{aspectRatio: 3}"
        :canvas="{
          height: 200,
          width: 600
        }"
    />
    <button class="button green" v-show="!editMode&&imgStatus()===2" @click="downloadImage">ダウンロード</button>
    <button v-show="editMode" class="button green" @click="crop">切り取り</button>
  </div>
</template>
<style lang="scss">

.button {
  input {
    display: none;
  }
}

.main-preview {
  width: 300px;
  max-height: 200px;
}

.cropper {
  max-height: 50vh;
}

.status_field {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  height: 5rem;

  img {
    height: 3rem;
  }
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 50rem;
}

.button {
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.5rem;
  border-radius: 1rem;
  margin: 0.3rem;
}

.buttonRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.green {
  background-color: #25cf3f;
  color: white;
}

* {
  transition: opacity 1s linear 0s;
  animation-name: fadeUpAnime;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  opacity: 0;
}

.vue-advanced-cropper__foreground {
  background: #15151533;
}

@keyframes fadeUpAnime {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
