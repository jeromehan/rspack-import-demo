<template>
  <div>dsfdsfsdf</div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import {
  ImagePreview
} from 'vant'
import 'vant/lib/image-preview/style';
export default defineComponent({
  setup() {
    ImagePreview({
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
      closeable: true,
    })
    return {
    }
  }
})
</script>


