<script lang="ts">
  let filesToUpload = new Set<File>();
</script>

<div>
  <input
    type="file"
    multiple
    directory
    webkitdirectory
    mozdirectory
    on:change={(e) => {
      console.log(e.target.files);
    }}
  />

  {#each Array.from(filesToUpload) as file}
    <div>{file.name}</div>
  {/each}
</div>
