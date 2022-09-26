<template>
  <div>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"><slot /></v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" class="model_cancel_btn" text
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" class="model_delete_btn" text>OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogDelete: false,
    };
  },
  props: ["isOpen"],
  watch: {
    isOpen() {
      this.dialogDelete = this.isOpen;
    },
  },
};
</script>
