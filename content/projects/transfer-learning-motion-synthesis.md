---
title: A study of transfer learning on data-driven motion synthesis frameworks
description: This research explores transfer learning techniques to enhance the scalability and applicability of deep learning-based motion synthesis models for 3D characters in virtual environments.
date: 2023-12-05
tags: ["PyTorch", "Mixture-of-Experts", "MLP", "Pytorch-lightning", "Ray", "Unity"]
type: project
---



# Deep learning-based rig-agnostic encoding
[Paper](https://kth.diva-portal.org/smash/record.jsf?pid=diva2%3A1635572&dswid=5826)

[Github Repository](https://github.com/Neroro64/Deep-learning-based-rig-agnostic-encoding)

This is my master thesis project about studying the possibility of transfer learning for data-driven motion generation frameworks.
All necessary code for producing the results described in the thesis are provided here as it is. 

**Objective-driven motion generation model architecture**

**Rig-agnostic encoding approaches**

### Abstract
Various research has shown the potential and robustness of deep learning-based approaches to synthesise novel motions of 3D characters in virtual environments, such as video games and films.
The models are trained with the motion data that is bound to the respective character skeleton (rig).
It inflicts a limitation on the scalability and the applicability of the models since they can only learn motions from one particular rig (domain) and produce motions in that domain only.

Transfer learning techniques can be used to overcome this issue and allow the models to better adapt to other domains with limited data.
This work presents a study of three transfer learning techniques for the proposed Objective-driven motion generation model (OMG), which is a model for procedurally generating animations conditioned on positional and rotational objectives.
Three transfer learning approaches for achieving rig-agnostic encoding (RAE) are proposed and experimented with: Feature encoding (FE), Feature clustering (FC) and Feature selection (FS), to improve the learning of the model on new domains with limited data.

All three approaches demonstrate significant improvement in both the performance and the visual quality of the generated animations, when compared to the vanilla performance.
The empirical results indicate that the FE and the FC approaches yield better transferring quality than the FS approach.
It is inconclusive which of them performs better, but the FE approach is more computationally efficient, which makes it the more favourable choice for real-time applications.
 

### Implementation and tuning
The created motion data are exported from Unity as JSON files, which are parsed and
extracted to Numpy arrays and stored as bzip­2 compressed binary files.

The models are implemented in Python using Pytorch and Pytorch­Lightning. 

The implementation of the models are based on [MANN][1], [NSM][2], [LMP­MoE][3], [MVAE][4] and [TRLSTM][5]
The implemented models are tested with a small subset of the dataset, to verify
the implementation. Ensuring that the reconstruction errors are optimised during
the training, and the models are capable of generating correct animations. The
hyperparameters such as the number of layers, the layer sizes and the learning rates are
tuned using Ray Tune 4 with ASHA scheduler and a grid search algorithm.

### Contents
1. [ Jupyter Notebooks ](https://github.com/Neroro64/Deep-learning-based-rig-agnostic-encoding/blob/main/src/notebooks) - contains the notebooks for computing and plotting the results (assuming the models are trained and available).
2. [ MLP with adversarial net ](https://github.com/Neroro64/Deep-learning-based-rig-agnostic-encoding/blob/main/src/autoencoder/MLP_Adversarial.py) - is the default Autoencoder (3-layer MLP) + an adversarial Conv-LSGAN model for providing the adversarial error of the generated poses.
3. [ Clustering models ](https://github.com/Neroro64/Deep-learning-based-rig-agnostic-encoding/blob/main/src/clustering_modes) - contains four variants of AE with an extra layer between the encoder and decoder for performing the clustering on the embeddings
4. [ Experiments ](https://github.com/Neroro64/Deep-learning-based-rig-agnostic-encoding/blob/main/src/experiments) - contains code for training, validating and testing the various models
5. [ func ](https://github.com/Neroro64/Deep-learning-based-rig-agnostic-encoding/blob/main/src/func) - contains miscellanenous functions for extracting, preparing data
6. [ motion_generation_models ](https://github.com/Neroro64/Deep-learning-based-rig-agnostic-encoding/blob/main/src/motion_generation_models) - contains the various OMG models and MoGenNet

### References
[1]: Zhang, He, Starke, Sebastian, Komura, Taku, and Saito, Jun. “Mode­adaptive
neural networks for quadruped motion control”. In: ACM Transactions on
Graphics (TOG) 37.4 (2018), pp. 1–11. ISSN: 0730­0301. DOI: 10.1145/3197517.
3201366.

[2]: Starke, Sebastian, Zhang, He, Komura, Taku, and Saito, Jun. “Neural state machine
for character­scene interactions”. In: ACM Transactions on Graphics (TOG) 38.6
(2019), pp. 1–14. ISSN: 0730­0301. DOI: 10.1145/3355089.3356505.

[3]: Starke, Sebastian, Zhao, Yiwei, Komura, Taku, and Zaman, Kazi. “Local motion
phases for learning multi­contact character movements”. In: ACM Transactions
on Graphics (TOG) 39.4 (2020), 54:1–54:13. ISSN: 0730­0301. DOI: 10 . 1145 /
3386569.3392450.

[4]: Ling, Hung Yu, Zinno, Fabio, Cheng, George, and Panne, Michiel Van De.
“Character controllers using motion VAEs”. In: ACM Transactions on Graphics
(TOG) 39.4 (2020), 40:1–40:12. ISSN: 0730­0301. DOI: 10 . 1145 / 3386569 .
3392422.

[5]: Harvey, Félix G., Yurick, Mike, Nowrouzezahrai, Derek, and Pal, Christopher.
“Robust motion in­betweening”. In: ACM Transactions on Graphics (TOG) 39.4
(2020), 60:1–60:12. ISSN: 0730­0301. DOI: 10.1145/3386569.3392480.
