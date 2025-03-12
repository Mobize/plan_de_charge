<?php
$cacheDir = __DIR__ . '/var/cache/';

function deleteFolder($folder) {
    if (!is_dir($folder)) return;
    foreach (scandir($folder) as $file) {
        if ($file === '.' || $file === '..') continue;
        $path = $folder . DIRECTORY_SEPARATOR . $file;
        if (is_dir($path)) {
            deleteFolder($path);
        } else {
            unlink($path);
        }
    }
    rmdir($folder);
}

deleteFolder($cacheDir . 'dev');
deleteFolder($cacheDir . 'prod');

echo "Cache Symfony vidé avec succès !";
