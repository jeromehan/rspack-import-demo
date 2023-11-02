<template>
  <div class="page-main">
    <div @click="previewImg(0)">32432432</div>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api'
import { ImagePreview } from 'vant'
import 'vant/lib/image-preview/style'
export var checkIntersectionObserver = function checkIntersectionObserver() {
  var inBrowser = typeof window !== 'undefined' && window !== null;
  if (inBrowser && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get: function get() {
          return this.intersectionRatio > 0;
        }
      });
    }
    return true;
  }
  return false;
};

checkIntersectionObserver() ? Promise.resolve() : import('intersection-observer');


export default defineComponent({
  setup() {
    const previewImg = (index) => {
      ImagePreview({
        images: [
          'https://img01.yzcdn.cn/vant/apple-1.jpg',
          'https://img01.yzcdn.cn/vant/apple-2.jpg',
        ],
        closeable: true,
      });
    }

    return {
      previewImg,
    }
  }
})
</script>
  
  