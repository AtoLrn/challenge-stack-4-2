<template>
  <slot name="activator" :openModal="openModal">
    <button @click="open = true">Open modal</button>
  </slot>
  <div class="modal h-100 flex content-ctr align-st" v-show="open">
    <div class="backdrop w-100 h-100" @click="closeModal"></div>
    <div class="modal-box rad-md" :class="modalSize">
      <div class="modal-title title text-l bdr-btm">
        <slot name="title">
          <h1>Modal title</h1>
        </slot>
      </div>
      <div class="modal-content text-l">
        <slot>Modal content</slot>
      </div>
      <div class="modal-actions flex content-fe">
        <slot name="actions" :closeModal="closeModal">
          <button @click="closeModal">Fermer</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps(
    {
      modalSize: {
        type: String,
        default: 'w-50'
      },
    }
)

const open = ref(false);

function closeModal() {
  open.value = false;
}

function openModal() {
  open.value = true;
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  padding-top: 2rem;
  overflow: hidden;

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-box {
    background-color: var(--white);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
    overflow: hidden;

    .modal-title {
      padding: 1rem 1.5rem;
      font-size: 18px;
    }

    .modal-content {
      padding: 1rem 1.5rem;
    }

    .modal-actions {
      padding: 1rem 1.5rem;
      border-top: var(--border);
    }

  }

}

</style>
