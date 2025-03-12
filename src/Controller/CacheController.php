<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CacheController extends AbstractController
{
    #[Route('/clear-cache', name: 'clear_cache', methods: ['POST'])]
    public function clearCache(KernelInterface $kernel, Request $request): JsonResponse
    {
        $application = new Application($kernel);
        $application->setAutoExit(false);

        $input = new ArrayInput([
            'command' => 'cache:clear',
        ]);

        $output = new BufferedOutput();
        $application->run($input, $output);

        return new JsonResponse(['message' => 'Cache vidé avec succès !']);
    }
}

