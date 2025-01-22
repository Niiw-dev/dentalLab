document.addEventListener('DOMContentLoaded', function () {
    var deleteModal = document.getElementById('confirmDeletionModal');
    var restoreModal = document.getElementById('confirmRestoreModal');

    deleteModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var backupFilename = button.getAttribute('data-backup');
        var deleteForm = deleteModal.querySelector('#deleteForm');
        deleteForm.querySelector('#deleteFile').value = backupFilename;
    });

    restoreModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;
        var backupFilename = button.getAttribute('data-backup');
        var restoreForm = restoreModal.querySelector('#restoreForm');
        restoreForm.querySelector('#restoreFile').value = backupFilename;
    });

    document.getElementById('fechaFiltro').addEventListener('change', function () {
        document.getElementById('filtroForm').submit();
    });
});