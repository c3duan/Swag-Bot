# Build external deps.
{
    'variables': { 'target_arch%': 'x64' },

    'target_defaults': {
        'default_configuration': 'Debug',
        'configuration': {
            'Debug': {
                'defines': [ 'DEBUG', '_DEBUG' ],
                'msvs_settings': {
                    'VSSLCompilerTool': {
                        'RuntimeLibrary': 1, #static debug
                    },
                },
            },
            'Release': {
                'defines': [ 'NODEBUG' ],
                'msvs_settings': {
                    'VSSLCompilerTool': {
                        'RuntimeLibrary': 0, #static release
                    },
                },
            },
        },
        'msvs_settings': {
            'VCLinkerTool': {
                'GenerateDebugInformation': 'true',
            },
        },
    },

    'targets': [
        {
            'target_name': 'libopus',
            'type': 'static_library',
            'sources': [
                'opus/src/opus.c',
                'opus/src/opus_decoder.c',
                'opus/src/opus_encoder.c',
                'opus/src/opus_multistream.c',
                'opus/src/opus_multistream_encoder.c',
                'opus/src/opus_multistream_decoder.c',
                'opus/src/repacketizer.c',
                'opus/src/analysis.c',
                'opus/src/mlp.c',
                'opus/src/mlp_data.c',
                'opus/celt/bands.c',
                'opus/celt/celt.c',
                'opus/celt/celt_encoder.c',
                'opus/celt/celt_decoder.c',
                'opus/celt/cwrs.c',
                'opus/celt/entcode.c',
                'opus/celt/entdec.c',
                'opus/celt/entenc.c',
                'opus/celt/kiss_fft.c',
                'opus/celt/laplace.c',
                'opus/celt/mathops.c',
                'opus/celt/mdct.c',
                'opus/celt/modes.c',
                'opus/celt/pitch.c',
                'opus/celt/celt_lpc.c',
                'opus/celt/quant_bands.c',
                'opus/celt/rate.c',
                'opus/celt/vq.c',
                # 'celt/x86/x86cpu.c' # CELT_SOURCES_SSE
                # 'celt/x86/x86_celt_map.c' # CELT_SOURCES_SSE
                # 'celt/x86/pitch_sse.c' # CELT_SOURCES_SSE
                # 'celt/x86/celt_lpc_sse.c' # CELT_SOURCES_SSE4_1
                # 'celt/arm/armcpu.c' # CELT_SOURCES_ARM
                # 'celt/arm/arm_celt_map.c' # CELT_SOURCES_ARM
                # 'celt/arm/celt_pitch_xcorr_arm.s' # CELT_SOURCES_ARM_ASM
                # 'celt/arm/armopts.s.in' # CELT_AM_SOURCES_ARM_ASM
                # 'celt/arm/celt_neon_intr.c' # CELT_SOURCES_ARM_NEON_INTR


                #SILK_SOURCES =
                'opus/silk/CNG.c',
                'opus/silk/code_signs.c',
                'opus/silk/init_decoder.c',
                'opus/silk/decode_core.c',
                'opus/silk/decode_frame.c',
                'opus/silk/decode_parameters.c',
                'opus/silk/decode_indices.c',
                'opus/silk/decode_pulses.c',
                'opus/silk/decoder_set_fs.c',
                'opus/silk/dec_API.c',
                'opus/silk/enc_API.c',
                'opus/silk/encode_indices.c',
                'opus/silk/encode_pulses.c',
                'opus/silk/gain_quant.c',
                'opus/silk/interpolate.c',
                'opus/silk/LP_variable_cutoff.c',
                'opus/silk/NLSF_decode.c',
                'opus/silk/NSQ.c',
                'opus/silk/NSQ_del_dec.c',
                'opus/silk/PLC.c',
                'opus/silk/shell_coder.c',
                'opus/silk/tables_gain.c',
                'opus/silk/tables_LTP.c',
                'opus/silk/tables_NLSF_CB_NB_MB.c',
                'opus/silk/tables_NLSF_CB_WB.c',
                'opus/silk/tables_other.c',
                'opus/silk/tables_pitch_lag.c',
                'opus/silk/tables_pulses_per_block.c',
                'opus/silk/VAD.c',
                'opus/silk/control_audio_bandwidth.c',
                'opus/silk/quant_LTP_gains.c',
                'opus/silk/VQ_WMat_EC.c',
                'opus/silk/HP_variable_cutoff.c',
                'opus/silk/NLSF_encode.c',
                'opus/silk/NLSF_VQ.c',
                'opus/silk/NLSF_unpack.c',
                'opus/silk/NLSF_del_dec_quant.c',
                'opus/silk/process_NLSFs.c',
                'opus/silk/stereo_LR_to_MS.c',
                'opus/silk/stereo_MS_to_LR.c',
                'opus/silk/check_control_input.c',
                'opus/silk/control_SNR.c',
                'opus/silk/init_encoder.c',
                'opus/silk/control_codec.c',
                'opus/silk/A2NLSF.c',
                'opus/silk/ana_filt_bank_1.c',
                'opus/silk/biquad_alt.c',
                'opus/silk/bwexpander_32.c',
                'opus/silk/bwexpander.c',
                'opus/silk/debug.c',
                'opus/silk/decode_pitch.c',
                'opus/silk/inner_prod_aligned.c',
                'opus/silk/lin2log.c',
                'opus/silk/log2lin.c',
                'opus/silk/LPC_analysis_filter.c',
                'opus/silk/LPC_inv_pred_gain.c',
                'opus/silk/table_LSF_cos.c',
                'opus/silk/NLSF2A.c',
                'opus/silk/NLSF_stabilize.c',
                'opus/silk/NLSF_VQ_weights_laroia.c',
                'opus/silk/pitch_est_tables.c',
                'opus/silk/resampler.c',
                'opus/silk/resampler_down2_3.c',
                'opus/silk/resampler_down2.c',
                'opus/silk/resampler_private_AR2.c',
                'opus/silk/resampler_private_down_FIR.c',
                'opus/silk/resampler_private_IIR_FIR.c',
                'opus/silk/resampler_private_up2_HQ.c',
                'opus/silk/resampler_rom.c',
                'opus/silk/sigm_Q15.c',
                'opus/silk/sort.c',
                'opus/silk/sum_sqr_shift.c',
                'opus/silk/stereo_decode_pred.c',
                'opus/silk/stereo_encode_pred.c',
                'opus/silk/stereo_find_predictor.c',
                'opus/silk/stereo_quant_pred.c',

                # SILK_SOURCES_FLOAT
                'opus/silk/float/apply_sine_window_FLP.c',
                'opus/silk/float/corrMatrix_FLP.c',
                'opus/silk/float/encode_frame_FLP.c',
                'opus/silk/float/find_LPC_FLP.c',
                'opus/silk/float/find_LTP_FLP.c',
                'opus/silk/float/find_pitch_lags_FLP.c',
                'opus/silk/float/find_pred_coefs_FLP.c',
                'opus/silk/float/LPC_analysis_filter_FLP.c',
                'opus/silk/float/LTP_analysis_filter_FLP.c',
                'opus/silk/float/LTP_scale_ctrl_FLP.c',
                'opus/silk/float/noise_shape_analysis_FLP.c',
                'opus/silk/float/prefilter_FLP.c',
                'opus/silk/float/process_gains_FLP.c',
                'opus/silk/float/regularize_correlations_FLP.c',
                'opus/silk/float/residual_energy_FLP.c',
                'opus/silk/float/solve_LS_FLP.c',
                'opus/silk/float/warped_autocorrelation_FLP.c',
                'opus/silk/float/wrappers_FLP.c',
                'opus/silk/float/autocorrelation_FLP.c',
                'opus/silk/float/burg_modified_FLP.c',
                'opus/silk/float/bwexpander_FLP.c',
                'opus/silk/float/energy_FLP.c',
                'opus/silk/float/inner_product_FLP.c',
                'opus/silk/float/k2a_FLP.c',
                'opus/silk/float/levinsondurbin_FLP.c',
                'opus/silk/float/LPC_inv_pred_gain_FLP.c',
                'opus/silk/float/pitch_analysis_core_FLP.c',
                'opus/silk/float/scale_copy_vector_FLP.c',
                'opus/silk/float/scale_vector_FLP.c',
                'opus/silk/float/schur_FLP.c',
                'opus/silk/float/sort_FLP.c',

                # SILK_SOURCES_SSE4_1 = silk/x86/NSQ_sse.c
                # silk/x86/NSQ_del_dec_sse.c
                # silk/x86/x86_silk_map.c
                # silk/x86/VAD_sse.c
                # silk/x86/VQ_WMat_EC_sse.c

                # SILK_SOURCES_FIXED =
                # silk/fixed/LTP_analysis_filter_FIX.c
                # silk/fixed/LTP_scale_ctrl_FIX.c
                # silk/fixed/corrMatrix_FIX.c
                # silk/fixed/encode_frame_FIX.c
                # silk/fixed/find_LPC_FIX.c
                # silk/fixed/find_LTP_FIX.c
                # silk/fixed/find_pitch_lags_FIX.c
                # silk/fixed/find_pred_coefs_FIX.c
                # silk/fixed/noise_shape_analysis_FIX.c
                # silk/fixed/prefilter_FIX.c
                # silk/fixed/process_gains_FIX.c
                # silk/fixed/regularize_correlations_FIX.c
                # silk/fixed/residual_energy16_FIX.c
                # silk/fixed/residual_energy_FIX.c
                # silk/fixed/solve_LS_FIX.c
                # silk/fixed/warped_autocorrelation_FIX.c
                # silk/fixed/apply_sine_window_FIX.c
                # silk/fixed/autocorr_FIX.c
                # silk/fixed/burg_modified_FIX.c
                # silk/fixed/k2a_FIX.c
                # silk/fixed/k2a_Q16_FIX.c
                # silk/fixed/pitch_analysis_core_FIX.c
                # silk/fixed/vector_ops_FIX.c
                # silk/fixed/schur64_FIX.c
                # silk/fixed/schur_FIX.c

                # SILK_SOURCES_FIXED_SSE4_1 = silk/fixed/x86/vector_ops_FIX_sse.c
                # silk/fixed/x86/burg_modified_FIX_sse.c
                # silk/fixed/x86/prefilter_FIX_sse.c
            ],
            'cflags': [
                '-fvisibility=hidden',
                '-W',
                '-Wstrict-prototypes',
                '-Wall',
                '-Wextra',
                '-Wcast-align',
                '-Wnested-externs',
                '-Wshadow',
                '-Wno-parentheses',
                '-Wno-unused-parameter',
                '-Wno-sign-compare',
                '-Wno-maybe-uninitialized'
            ],
            'include_dirs': [
                'config/opus/<(OS)/<(target_arch)',
                'opus/include',
                'opus/celt',
                'opus/silk',
                'opus/silk/float'
            ],
            'defines': [
                'PIC',
                'HAVE_CONFIG_H',
            ]
        }
    ]
}
